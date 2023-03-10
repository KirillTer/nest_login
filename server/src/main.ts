import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {ValidationPipe} from "./pipes/validation.pipe";


async function start() {
    const PORT = process.env.PORT || 5002;
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Fullstack login Nest React')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .addTag('KirTerr')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()