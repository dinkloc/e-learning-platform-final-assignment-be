import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Review")
@Controller("review")
export class ReviewController { }