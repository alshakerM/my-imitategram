import suggestionsData from '../../server/suggestions-data.json';

export default function handler(req, res) {
  const { count } = req.query;
  if (count > 0) {
    const slicedSuggestionsData = suggestionsData.slice(0, count);

    res.status(200).json(slicedSuggestionsData);
  } else {
    res.status(200).json(suggestionsData);
  }
}
