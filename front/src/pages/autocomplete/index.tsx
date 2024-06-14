import AutoComplete from '@/components/autocomplete';
import { getMovieList } from '@/service';
import { useQuery } from '@tanstack/react-query';

function AutoCompleteApp() {
  const { data: movies } = useQuery({
    queryKey: ['getMovieList'],
    queryFn: getMovieList,
    initialData: []
  });

  return <AutoComplete options={movies} getLabel={o => o.title} getValue={o => o.title} />;
}

export default AutoCompleteApp;
