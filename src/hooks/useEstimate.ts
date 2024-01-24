import * as shell from '@tauri-apps/api/shell';
import {
  ESTIMATE_API_BASE_URL,
  ESTIMATE_HOME_PAGE_URL,
} from '@/constants/url.ts';
import { useMutation } from '@tanstack/react-query';
import { IComputer } from '@/types/model/computer/computerType.ts';
import { Body, fetch } from '@tauri-apps/api/http';
import { IResponse } from '@/types/dto/response/responseType.ts';
import {
  createEstimateId,
  saveEstimateId,
} from '@/services/estimate/estimateId.ts';

async function createEstimate({
  computer,
}: {
  computer: IComputer;
}): Promise<string> {
  const estimateId = createEstimateId(computer);
  const endpoint = new URL(`/estimate/${estimateId}`, ESTIMATE_API_BASE_URL);

  const response = await fetch<IResponse<string>>(endpoint.href, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: Body.json(computer),
  });

  if (!response.ok) console.log('error', response.data, response.status);

  const responseDto = response.data;

  if (responseDto.status !== 'success') throw new Error(responseDto.message);

  return estimateId;
}

export const useEstimate = () => {
  return useMutation({
    mutationFn: createEstimate,
    onSuccess: async (estimateId: string) => {
      saveEstimateId(estimateId);

      const url = new URL(`/estimate/${estimateId}`, ESTIMATE_HOME_PAGE_URL);

      // Open default web browser
      return await shell.open(url.href);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
};
