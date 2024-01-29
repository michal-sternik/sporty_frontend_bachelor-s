import { VariantType, enqueueSnackbar } from 'notistack';

const handleClickVariant = (
  message: string | string[],
  variant: VariantType,
) => {
  enqueueSnackbar(message, { variant });
};

const convertError = (errors: any) => {
  if (!errors.response.data.Errors.length) {
    handleClickVariant(errors.response.data.Message, 'error');
  }
  if (errors.response.data.Errors !== undefined) {
    const errorTable: string[] = [];
    Object.values(errors.response.data.Errors).map((err: any) =>
      errorTable.push(err.Details),
    );

    errorTable.map((e) => handleClickVariant(e, 'error'));
  } else {
    handleClickVariant('Something went wrong', 'error');
  }
};

export { convertError, handleClickVariant };
