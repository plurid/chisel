export const getSelectionCaretAndLine = (
    editable: HTMLDivElement | null,
) => {
    try {
        if (!editable) return;

        // collapse selection to end
        (window as any).getSelection().collapseToEnd();

        const sel = window.getSelection();
        if (!sel) return;
        const range = sel.getRangeAt(0);

        // get anchor node if startContainer parent is editable
        let selectedNode = editable === range.startContainer.parentNode
          ? sel.anchorNode
          : range.startContainer.parentNode;

        if (!selectedNode) {
            return {
                caret: -1,
                line: -1,
            };
        }

        // select to top of editable
        range.setStart((editable as any).firstChild, 0);

        // do not use 'this' sel anymore since the selection has changed
        const content = (window as any).getSelection().toString();
        const text = JSON.stringify(content);
        const lines = (text.match(/\\n/g) || []).length + 1;

        // clear selection
        (window as any).getSelection().collapseToEnd();

        // minus 2 because of strange text formatting
        return {
            caret: text.length - 2,
            line: lines,
        }
    } catch (error) {
        return;
    }
}
