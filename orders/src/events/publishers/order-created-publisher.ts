import { Publisher, OrderCreatedEvent, Subjects } from '@sauravorg/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
