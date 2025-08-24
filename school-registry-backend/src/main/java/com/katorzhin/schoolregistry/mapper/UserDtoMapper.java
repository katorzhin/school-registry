package com.katorzhin.schoolregistry.mapper;

import com.katorzhin.schoolregistry.dto.authDto.RegisterDtoRequest;
import com.katorzhin.schoolregistry.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserDtoMapper {
    User toUser(RegisterDtoRequest request);
}