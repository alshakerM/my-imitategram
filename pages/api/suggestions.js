import suggestionsData from '../../server/suggestions-data.json'

export default function handler(req, res) {
  const { count } = req.query;
  if (count) {
    const slicedSuggestionsData = suggestionsData.slice(0, count);
    if (slicedSuggestionsData) {
      res.status(200).json(slicedSuggestionsData);
    } else {
      res.status(404).send('Not found.');
    }
  } else {
    res.status(200).json(suggestionsData);
  }
}
