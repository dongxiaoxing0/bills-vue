type Tag = {
    id: string;
    name: string;
};
type TagList = {
    data: Tag[];
    fetch: () => Tag[];
    save: () => void;
    create: (tagName: string) => 'success' | 'duplicated' | 'void';
};
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};