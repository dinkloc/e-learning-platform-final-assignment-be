import { Controller, Get, Post, Body } from '@nestjs/common';
import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
    constructor(private readonly pollService: PollService) { }

    @Post()
    createPoll(@Body() { question, options }: { question: string; options: string[] }) {
        return this.pollService.createPoll(question, options);
    }

    @Get()
    getAllPolls() {
        return this.pollService.getAllPolls();
    }
}