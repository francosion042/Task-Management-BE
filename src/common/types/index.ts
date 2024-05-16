// decorator options interface
export type IsUniqueInterface = {
  tableName: string;
  column: string;
};

export type ExistsInterface = {
  tableName: string;
  column: string;
};

export type ActiveViewerSocketConnectionType = {
  userId: number;
  socketId: string;
};

export type JoinActiveViewersType = {
  projectId: number;
};
