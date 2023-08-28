export type Phone = {
    phoneNumber:string
}

export type PhonesState = {
  phones:Phone[]
  error: string | undefined;
}