export const getPastedText = (
    event: React.ClipboardEvent<HTMLDivElement>,
) => {
    return event.clipboardData.getData('text');
}
