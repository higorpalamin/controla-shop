import Image from 'next/image';
import loading from '../../app/_assets/loading.svg';

function Loading() {
  return (
    <div>
      <Image src={loading} alt="Loading..." 
      className='w-8'
      />
    </div>
  );
}

export default Loading;