# Stage 1: Build the application
FROM maven:3.9.6 as builder
WORKDIR /usr/src/app
# This layer will be cached unless pom.xml changes.
COPY ./pom.xml .
RUN mvn dependency:go-offline
# This layer will be rebuilt every time the source code changes.
COPY ./src ./src
RUN mvn clean package

# Stage 2: Create the runtime image
FROM openjdk:21-jdk
COPY --from=builder /usr/src/app/target/backend-0.0.1.jar /usr/app/backend-0.0.1.jar
WORKDIR /usr/app
EXPOSE 8082

# Run the application
CMD ["java", "-jar", "backend-0.0.1.jar"]
