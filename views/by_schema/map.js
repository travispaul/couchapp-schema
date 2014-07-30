function (doc) {
    if (doc.schema) {
        emit(doc.schema, null);
    }
}
