import dbConnect from "@/db/dbConnect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  const place = await Place.findById(id);

  if (!place) {
    return response.status(404).json({ status: "Not found" });
  }

  response.status(200).json(place);

  if (request.method === "PUT") {
    const newPlaceData = request.body;
    await Place.findByIdAndUpdate(id, newPlaceData);
    response.status(200).json({ status: "Entry updated." });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Deleted successfully" });
  }
}
