export async function getActiveProject() {
  try {
    const ppro = (window as any).PPRO;

    if (!ppro) return null;

    if (ppro.Project?.getActiveProject) {
      return await ppro.Project.getActiveProject();
    }

    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getActiveSequence() {
  try {
    const project = await getActiveProject();

    if (!project) return null;

    if (project.getActiveSequence) {
      return await project.getActiveSequence();
    }

    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
