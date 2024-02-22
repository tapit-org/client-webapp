import { useState } from 'react';

const useBoolState = (initValue= false): [boolean, any] => {
    const [bool, setBool] = useState<boolean>(initValue)
    const toggle = () => setBool((prev:boolean) => !prev)
    return [bool, toggle]
 };
export default useBoolState;
