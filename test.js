/* previous single service fetch */

const response = await fetch(services_end_point);

if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const response_data = await response.json();

if (response_data.data) {
  const data = Array.isArray(response_data.data)
    ? response_data.data[0]
    : response_data.data;

  this.single_service = data;
  /* check if there is data */
  if (!this.single_service) {
    this.unaivailable_service = true;
    this.page_is_loading = false;
  }
} else {
  throw new Error("No data found in response");
}
