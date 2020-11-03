import { Publisher, Subjects, TicketCreatedEvent } from '@sauravorg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    
}