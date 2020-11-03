import { Publisher, Subjects, TicketUpdated as TicketUpdatedEvent} from '@sauravorg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    
}