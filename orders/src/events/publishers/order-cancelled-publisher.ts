import { Subjects, Publisher, OrderCancelledEvent } from '@sauravorg/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
