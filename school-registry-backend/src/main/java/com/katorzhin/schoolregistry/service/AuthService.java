package com.katorzhin.schoolregistry.service;

import com.katorzhin.schoolregistry.dto.authDto.AuthDtoRequest;
import com.katorzhin.schoolregistry.dto.authDto.AuthDtoResponse;
import com.katorzhin.schoolregistry.dto.authDto.RegisterDtoRequest;
import com.katorzhin.schoolregistry.exception.ApiException;
import com.katorzhin.schoolregistry.exception.ErrorCode;
import com.katorzhin.schoolregistry.exception.UsernameAlreadyExistsException;
import com.katorzhin.schoolregistry.mapper.UserDtoMapper;
import com.katorzhin.schoolregistry.model.User;
import com.katorzhin.schoolregistry.model.enums.Role;
import com.katorzhin.schoolregistry.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserDtoMapper userDtoMapper;


    public AuthService(UserRepository userRepo,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       UserDtoMapper userDtoMapper) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userDtoMapper = userDtoMapper;

    }

    public User register(RegisterDtoRequest request) {

        if (userRepo.existsByUsername(request.username())) {
            throw new UsernameAlreadyExistsException();
        }

        User user = userDtoMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(Role.ROLE_USER);
        return userRepo.save(user);
    }

    public AuthDtoResponse login(AuthDtoRequest request) {
        User user = userRepo.findByUsername(request.username())
                .orElseThrow(() -> new ApiException(ErrorCode.BAD_CREDENTIALS, HttpStatus.UNAUTHORIZED));

        if (!passwordEncoder.matches(request.password(), user.getPassword()))
            throw new ApiException(ErrorCode.BAD_CREDENTIALS, HttpStatus.UNAUTHORIZED);

        String token = jwtService.generateToken(user);
        return new AuthDtoResponse(token);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new ApiException(ErrorCode.AUTHENTICATION_FAILED, HttpStatus.UNAUTHORIZED));

    }
}
