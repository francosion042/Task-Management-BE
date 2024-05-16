import { Test, TestingModule } from '@nestjs/testing';
import { SocketConnectionGateway } from './socket-connection.gateway';
import { SocketConnectionService } from './socket-connection.service';

describe('SocketConnectionGateway', () => {
	let gateway: SocketConnectionGateway;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SocketConnectionGateway, SocketConnectionService],
		}).compile();

		gateway = module.get<SocketConnectionGateway>(SocketConnectionGateway);
	});

	it('should be defined', () => {
		expect(gateway).toBeDefined();
	});
});
