type TemplateProps = {
    //here
  };

export async function getColumnsStored(): Promise<TemplateProps[]> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('templatesData', function (result) {
        const templatesDataStored: TemplateProps[] = result.templatesData;
        if (templatesDataStored) {
          resolve(templatesDataStored);
        } else {
          reject('No data found in storage');
        }
      });
    });
  }