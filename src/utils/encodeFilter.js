// Function to create the base64 encoded filter string
const encodeFilter = (skip = 0, limit = 20, types = [1]) => {
  const filterObject = {
    Skip: skip,
    Limit: limit,
    Types: types,
  };

  // Convert the object to a JSON string
  const jsonString = JSON.stringify(filterObject);

  // Base64 encode the JSON string
  const base64EncodedFilter = btoa(jsonString);

  return base64EncodedFilter;
};

export default encodeFilter;
