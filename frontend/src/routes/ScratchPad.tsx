import React from 'react';
import queryClient from '../api/queryClient';
import {useMutation, useQuery} from 'react-query';
import {getScratchPad, updateScratchPad, useWhoAmI} from '../api/queries';

export default function ScratchPad() {
  const [text, setText] = React.useState('');
  const [putRequest, setPutRequest] = React.useState<any>(null);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const {data: user} = useWhoAmI();
  const {
    data: scratchPad,
    isLoading,
    error,
  } = useQuery('scratch_pad', () => getScratchPad(user.id));

  React.useEffect(() => setText(scratchPad?.text), [scratchPad]);

  function onChange(value: string) {
    setText(value);
    if (putRequest) clearTimeout(putRequest);
    setPutRequest(
      setTimeout(() => {
        setIsUpdating(true);
        scratchPadMutation.mutate(value);
      }, 300)
    );
  }

  const scratchPadMutation = useMutation(
    (value: string) => updateScratchPad(user.id, value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['whoami']);
        setIsUpdating(false);
      },
    }
  );

  return (
    <div className="container">
      <h1>Scratch Pad</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <textarea
          className="u-full-width"
          placeholder="Type anything here …"
          id="notes"
          value={text}
          rows={10}
          style={{
            height: 'auto',
          }}
          onChange={(e) => onChange(e.target.value)}
        ></textarea>
      )}
      {isUpdating && <p>Saving...</p>}
    </div>
  );
}
