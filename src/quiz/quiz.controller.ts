import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Quiz")
@Controller('quiz')
export class QuizController {
    constructor() {

    }
}