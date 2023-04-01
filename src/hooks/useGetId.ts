import { IUsedGetId } from '@/interfaces';
import { useId } from 'react';

/**
 * 고유값 생성을 위한 hook
 * @param param0 option - id 앞뒤의 접두사, 접미사를 설정할 수 있습니다.
 * @returns id - 접두사, 접미사가 설정되어 있으면 접두사-랜덤id-접미사, 접두사만 설정되어 있으면 접두사-랜덤id, 접미사만 설정되어 있으면 랜덤id-접미사, 접두사, 접미사가 설정되어 있지 않으면 랜덤id를 반환합니다.
 */

export default function useGetId({ prefix, postfix }: IUsedGetId) {
  const id = useId();
  if (prefix) {
    return `${prefix}-${id}`;
  }
  if (postfix) {
    return `${id}-${postfix}`;
  }
  if (prefix && postfix) {
    return `${prefix}-${id}-${postfix}`;
  }
  return id;
}
