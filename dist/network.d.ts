import { Chat, RawChat } from "./chat";
import { Post } from "./post";
import { ClientConfiguration, ClientCredentials, ReqTask, SocketResponse } from "./types";
import { ClientUser, RawUser, User } from "./user";
import { WebSocket } from "ws";
import { Group } from "./group";
export declare class Network {
    config?: ClientConfiguration | undefined;
    socket: WebSocket;
    readonly simpleSocket: import("./vendor/simplesocket").SimpleSocket;
    readonly awaitingMessages: Record<string, (result: SocketResponse<any>) => void>;
    posts: Record<string, Post>;
    chats: Record<string, Chat>;
    users: Record<string, User>;
    groups: Record<string, Group>;
    authtoken?: string;
    userid?: string;
    connectedChats: string[];
    user?: ClientUser;
    chatDelay: number;
    onPost: (post: Post) => void;
    onReady: () => void;
    fingerprint: string;
    generalUpdateSub?: string;
    post(text: string, groupid: string | undefined, medias: any[], configuration: []): Promise<Post>;
    getPosts({ amount, groupid, before, userid, initial }: Partial<GetPostsQuery>): Promise<Post[]>;
    connectChat(postid: string): Promise<void>;
    disconnectChat(postid: string): Promise<void>;
    processUsers(rawUsers: RawUser[]): User[];
    reply(text: string, postid: string, replyid: string, groupid?: string): Promise<Chat>;
    chat(text: string, postid: string, groupid?: string): Promise<Chat>;
    chatQueue: {
        postid: string;
        replyid?: string;
        groupid?: string;
        text: string;
        res: (chat: Chat) => void;
        rej: (msg: string) => void;
    }[];
    isProcessing: boolean;
    private next;
    private _chat;
    processChats(rawChats: RawChat[]): void;
    authenticate(username: string, password: string): Promise<void>;
    onGroupsChanged(): void;
    private _init;
    private reqid;
    message<Body>(task: ReqTask, body?: any): Promise<SocketResponse<Body>>;
    signout(): Promise<{
        Code: number;
        Message: string;
        ClientFunction?: "NewChatRecieve" | undefined;
    }>;
    constructor(credentials?: ClientCredentials, config?: ClientConfiguration | undefined);
}
export interface GetPostsQuery {
    amount: number;
    before: number;
    userid: string;
    groupid: string;
    initial: true;
}
