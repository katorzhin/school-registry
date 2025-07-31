
FROM gradle:8.7-jdk17 AS builder
WORKDIR /app

COPY . .
RUN gradle bootJar

FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=builder /app/build/libs/app.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
