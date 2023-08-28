import { Adapter, BroadcastOptions, Room } from "socket.io-adapter";
export interface ClusterAdapterOptions {
    /**
     * The number of ms between two heartbeats.
     * @default 5_000
     */
    heartbeatInterval?: number;
    /**
     * The number of ms without heartbeat before we consider a node down.
     * @default 10_000
     */
    heartbeatTimeout?: number;
}
export declare enum MessageType {
    INITIAL_HEARTBEAT = 1,
    HEARTBEAT = 2,
    BROADCAST = 3,
    SOCKETS_JOIN = 4,
    SOCKETS_LEAVE = 5,
    DISCONNECT_SOCKETS = 6,
    FETCH_SOCKETS = 7,
    FETCH_SOCKETS_RESPONSE = 8,
    SERVER_SIDE_EMIT = 9,
    SERVER_SIDE_EMIT_RESPONSE = 10,
    BROADCAST_CLIENT_COUNT = 11,
    BROADCAST_ACK = 12
}
export interface ClusterMessage {
    uid: string;
    type: MessageType;
    data?: Record<string, unknown>;
}
interface ClusterResponse {
    type: MessageType;
    data: {
        requestId: string;
        [key: string]: unknown;
    };
}
/**
 * A cluster-ready adapter. Any extending class must:
 *
 * - implement {@link ClusterAdapter#publishMessage} and {@link ClusterAdapter#publishResponse}
 * - call {@link ClusterAdapter#onMessage} and {@link ClusterAdapter#onResponse}
 */
export declare abstract class ClusterAdapter extends Adapter {
    protected readonly uid: string;
    private requests;
    private ackRequests;
    protected constructor(nsp: any);
    /**
     * Called when receiving a message from another member of the cluster.
     *
     * @param message
     * @param offset
     * @protected
     */
    protected onMessage(message: ClusterMessage, offset?: string): Promise<any>;
    /**
     * Called when receiving a response from another member of the cluster.
     *
     * @param response
     * @protected
     */
    protected onResponse(response: ClusterResponse): void;
    broadcast(packet: any, opts: BroadcastOptions): Promise<any>;
    /**
     * Adds an offset at the end of the data array in order to allow the client to receive any missed packets when it
     * reconnects after a temporary disconnection.
     *
     * @param packet
     * @param opts
     * @param offset
     * @private
     */
    private addOffsetIfNecessary;
    broadcastWithAck(packet: any, opts: BroadcastOptions, clientCountCallback: (clientCount: number) => void, ack: (...args: any[]) => void): void;
    addSockets(opts: BroadcastOptions, rooms: Room[]): void;
    delSockets(opts: BroadcastOptions, rooms: Room[]): void;
    disconnectSockets(opts: BroadcastOptions, close: boolean): void;
    fetchSockets(opts: BroadcastOptions): Promise<any[]>;
    serverSideEmit(packet: any[]): Promise<any>;
    protected publish(message: Omit<ClusterMessage, "uid">): Promise<string>;
    /**
     * Send a message to the other members of the cluster.
     *
     * @param message
     * @protected
     * @return an offset, if applicable
     */
    protected abstract publishMessage(message: ClusterMessage): Promise<string>;
    /**
     * Send a response to the given member of the cluster.
     *
     * @param requesterUid
     * @param response
     * @protected
     */
    protected abstract publishResponse(requesterUid: string, response: ClusterResponse): any;
}
export declare abstract class ClusterAdapterWithHeartbeat extends ClusterAdapter {
    private readonly _opts;
    private heartbeatTimer;
    private nodesMap;
    protected constructor(nsp: any, opts: ClusterAdapterOptions);
    init(): Promise<void> | void;
    private scheduleHeartbeat;
    close(): Promise<void> | void;
    onMessage(message: ClusterMessage, offset?: string): any;
    serverCount(): Promise<number>;
    publish(message: Omit<ClusterMessage, "uid">): Promise<string>;
}
export {};
