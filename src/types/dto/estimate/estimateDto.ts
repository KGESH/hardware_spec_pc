type EstimateCreateStatus = 'pending' | 'exist' | 'changed' | 'error';

export type IEstimateCreateResponseDto = {
  status: EstimateCreateStatus;
  shopId: string;
  encodedId: string;
  estimateId: string;
};
