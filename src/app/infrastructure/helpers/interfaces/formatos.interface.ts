

export interface RespondeFormatoRequest {
    response: {
      '@odata.context': string;
      '@microsoft.graph.downloadUrl': string;
      createdDateTime: string;
      id: string;
      name: string;
      webUrl: string;
      size: number;
    };
  }