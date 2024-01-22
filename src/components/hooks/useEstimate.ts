import { ESTIMATE_HOME_PAGE_URL } from '@/constants/url';
import { useMutation } from '@tanstack/react-query';
import { IComputer } from '@/types/model/computer/computerType';
import { Body, fetch } from '@tauri-apps/api/http';
import { IResponse, IResponseSuccess } from '@/types/dto/response/responseType';
import * as shell from '@tauri-apps/api/shell';

async function handleMutation({
  endpoint,
  computer,
}: {
  endpoint: string;
  computer: IComputer;
}): Promise<IResponseSuccess<unknown>> {
  const response = await fetch<IResponse<any>>(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: Body.json(computer),
  });

  if (!response.ok) {
    console.log('error', response.data, response.status);
  }

  const responseDto = response.data;

  if (responseDto.status !== 'success') throw new Error(responseDto.message);

  return responseDto;
}

export const useEstimate = () => {
  return useMutation({
    mutationFn: handleMutation,
    onSuccess: async (data) => {
      console.log('success', data);
      // Open default web browser
      await shell.open(ESTIMATE_HOME_PAGE_URL);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
};
