class TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

export default class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(item: string): void {
    let currentNode = this.root;

    for (const char of item) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
    }

    currentNode.isEndOfWord = true;
  }

  delete(item: string): void {
    const deleteRecursively = (node: TrieNode, item: string, index: number): boolean => {
      if (index === item.length) {
        if (node.isEndOfWord) {
          node.isEndOfWord = false;
          return Object.keys(node.children).length === 0;
        }
        return false;
      }

      const char = item[index];
      const nextNode = node.children[char];

      if (!nextNode) {
        return false;
      }

      const shouldDeleteChild = deleteRecursively(nextNode, item, index + 1);

      if (shouldDeleteChild) {
        delete node.children[char];
        return Object.keys(node.children).length === 0 && !node.isEndOfWord;
      }

      return false;
    };

    deleteRecursively(this.root, item, 0);
  }

  find(partial: string): string[] {
    let currentNode = this.root;

    for (const char of partial) {
      if (!currentNode.children[char]) {
        return [];
      }
      currentNode = currentNode.children[char];
    }

    const results: string[] = [];

    const traverse = (node: TrieNode, prefix: string) => {
      if (node.isEndOfWord) {
        results.push(prefix);
      }

      for (const char in node.children) {
        traverse(node.children[char], prefix + char);
      }
    };

    traverse(currentNode, partial);

    return results;
  }
}

