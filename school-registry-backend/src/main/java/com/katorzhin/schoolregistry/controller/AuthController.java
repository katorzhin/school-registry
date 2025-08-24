package com.katorzhin.schoolregistry.controller;

import com.katorzhin.schoolregistry.dto.authDto.AuthDtoRequest;
import com.katorzhin.schoolregistry.dto.authDto.AuthDtoResponse;
import com.katorzhin.schoolregistry.dto.authDto.RegisterDtoRequest;
import com.katorzhin.schoolregistry.model.User;
import com.katorzhin.schoolregistry.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterDtoRequest request) {
        User createdUser = authService.register(request);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDtoResponse> login(@RequestBody AuthDtoRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}