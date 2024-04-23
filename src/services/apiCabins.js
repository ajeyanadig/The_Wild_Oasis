import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}
export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1 create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }
  //2 upload img
  //https://rpkixlrdqppbbvrycclg.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg

  const { data: data2, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  // console.log(imageName, imagePath);
  // console.log(data2);
  //messing around , deleting from bucket by PATH
  //await supabase.storage.from("cabin-images").remove([data2.path]);

  //Prevent cabin creation in case of file not being uploaded correctly
  //3. Delete cabin row entry if storage error
  if (storageError) {
    console.log(data);
    await supabase.from("cabins").delete().eq("id", data.at(0).id);

    console.log(storageError);
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
