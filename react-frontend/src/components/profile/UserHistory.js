import MemePreview from './MemePreview';
import SearchBar from './SearchBar';


function UserHistory() {

  let previews = []
  for (let i = 0; i < 10; ++i) {
    previews.push(<MemePreview/>)
  }

  return (
    <>
    <SearchBar/>
    {previews}
    </>
  );
}
export default UserHistory;