import { Subjects } from './subjects';

// Event for Ticket Creation
export interface TicketCreatedEvent { 
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number
    };
}