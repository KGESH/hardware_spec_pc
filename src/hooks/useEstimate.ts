import * as shell from '@tauri-apps/api/shell';
import {
  ESTIMATE_API_BASE_URL,
  ESTIMATE_HOME_PAGE_URL,
} from '@/constants/url.ts';
import { useMutation } from '@tanstack/react-query';
import { IComputer } from '@/types/model/computer/computerType.ts';
import { Body, fetch } from '@tauri-apps/api/http';
import { IResponse } from '@/types/dto/response/responseType.ts';
import { IEstimateCreateResponseDto } from '@/types/dto/estimate/estimateDto.ts';
import {
  createHardwareComponentsEncodingId,
  saveEncodedId,
} from '@/services/estimate/id.ts';

async function createEstimate({
  computer,
}: {
  computer: IComputer;
}): Promise<IEstimateCreateResponseDto> {
  const encodedId = createHardwareComponentsEncodingId(computer);
  const endpoint = new URL(`/estimate/${encodedId}`, ESTIMATE_API_BASE_URL);

  try {
    const response = await fetch<IResponse<IEstimateCreateResponseDto>>(
      endpoint.href,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: Body.json(computer),
      },
    );

    console.log(response);
    const responseDto = response.data;

    if (responseDto.status !== 'success') {
      console.error(responseDto);
      throw new Error(responseDto.message);
    }

    return responseDto.data;
  } catch (e) {
    throw e;
  }
}

export const useEstimate = () => {
  return useMutation({
    mutationFn: createEstimate,
    onSuccess: async ({ estimateId, encodedId }) => {
      saveEncodedId(encodedId);

      const url = new URL(
        `/estimate/${estimateId}/${encodedId}`,
        ESTIMATE_HOME_PAGE_URL,
      );

      // Open default web browser
      return await shell.open(url.href);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
};
