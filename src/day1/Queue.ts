type QNode<T> = {
    value: T;
    next?: QNode<T>;
};

export default class Queue<T> {
    public length: number;
    private head: QNode<T> | undefined;
    private tail: QNode<T> | undefined;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        console.log(this, item)
        const node = { value: item } as QNode<T>;
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;


    }
    deque(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length--;

        const head = this.head;
        this.head = this.head.next;

        if (this.length === 0) {
            this.tail = undefined
        }

        return head.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
