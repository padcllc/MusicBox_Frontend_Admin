export function constructFormData<T>(body: T): FormData {
  const formData = new FormData();

  for (const key in body) {
    if (body[key] instanceof File) {
      formData.append(key, body[key] as File);
    } else {
      formData.append(key, body[key]?.toString() as string);
    }
  }

  return formData;
}
