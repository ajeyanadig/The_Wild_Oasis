import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1 create cabin
  // const { data, error } = await supabase
  //   .from("cabins")
  //   .insert([{ ...newCabin, image: imagePath }])
  //   .select()
  //   .single();

  let query = supabase.from("cabins");
  //A) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select();
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  //2 upload img

  if (hasImagePath) return data;
  // eslint-disable-next-line no-unused-vars
  const { data: data2, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //messing around , deleting from bucket by PATH
  //console.log(imageName, imagePath);
  // console.log(data2);
  //await supabase.storage.from("cabin-images").remove([data2.path]);

  //Prevent cabin creation in case of file not being uploaded correctly
  //3. Delete cabin row entry if storage error
  if (storageError) {
    console.log(data);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin img couldn't be uploaded and hence cabin row was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("The cabin could not be deleted");
  }
}
