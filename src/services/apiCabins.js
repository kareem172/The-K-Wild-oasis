import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("Something went wrong Getting the cabins");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // Generate a random name for the image
  const imgName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  // Generate the path to the image in the storage bucket
  const imgPath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;
  console.log(newCabin.image, hasImagePath, imgPath);

  let query = supabase.from("cabins");

  // If the cabin already exists, update it
  if (id) query = query.update({ ...newCabin, image: imgPath }).eq("id", id);

  // add data to the table
  if (!id) query = query.insert([{ ...newCabin, image: imgPath }]); // Data to insert into the table must be an array

  const { data, error } = await query.select().single(); // Select the data to return

  if (error) {
    console.log(error);
    throw new Error("Something went wrong creating the cabin");
  }

  if (hasImagePath) return data; // If the image was already in the storage bucket, return the data

  // Upload the image to the storage bucket
  const { error: imgError } = await supabase.storage // supabase.storage is the storage object
    .from("cabin-images") // Name of the storage bucket
    .upload(imgName, newCabin.image); // newCabin.image is the file object

  if (imgError) {
    console.log(imgError);
    // If the image upload fails, delete the cabin from the table
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Something went wrong uploading the image");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Something went wrong deleting the cabin");
  }

  return data;
}
