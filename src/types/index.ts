export type VideoItemProps = {
  url: string;
};

export type Listener = {
  id: string;
  cb: Function;
};

export type ListenerInfo = {
  [key: string]: Listener[];
};
