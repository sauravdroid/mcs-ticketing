import request from 'supertest';
import {app} from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening /api/tickets for post requests', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})
    
    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid price is provided', async () => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: '',
        price: 10
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        price: 10
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'Hello World',
        price: -10
    })
    .expect(400);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'Hello World'
    })
    .expect(400);
});

it('creates a ticket with valid inputss', async () => {
    let tickets = await Ticket.find({});
    console.log(tickets);
    expect(tickets.length).toEqual(0);
    // Add in a check to make sure a ticket was saved
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'assadad',
        price: 20
    })
    .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[tickets.length - 1].price).toEqual(20);
});

it('Publishes an event', async () => {
    const title = 'assadad'

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title,
        price: 20
    })
    .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});