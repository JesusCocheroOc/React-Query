import { useQuery } from "@tanstack/react-query";


const getCryptoNumber = async (): Promise<number> => {
    const response = await fetch(
        'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
    );
    const data = await response.json();
    return Number(data);
};


export const RandomNumber = () => {

      const {
          data,
      } = useQuery({
          queryKey: ['randomNumber'],
          queryFn: getCryptoNumber,
          /// mantener valor por 60 s
          staleTime: 1000 * 60, // 60 s
      });


  return <div>RandomNumber: {data}</div>;
}
