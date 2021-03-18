# wri-starter-kit
Starter code for wri sites

Based off of https://github.com/pantheon-systems/example-drops-8-composer with some updates to make this install with the wri/wri_sites https://github.com/thinkshout/wri_sites profile.

## To build a new site
1. Make sure you have all the prerequisites to use the Pantheon build tools, as discussed at https://pantheon.io/docs/guides/build-tools/create-project/#prerequisites

2. Run this command:
   ```
   COMPOSER_MEMORY_LIMIT=-1 terminus build:project:create --team='ThinkShout' --org='thinkshout' --visibility='private' --stability='dev' wri/wri-starter-kit [new-project-name]
   ```
   
   More info about the build tools and what each section means is available at https://github.com/pantheon-systems/terminus-build-tools-plugin/blob/master/README.md#buildprojectcreate
   
3. Enable solr on your new site:

   ```
   terminus solr:enable [new-project-name] 
   ```

4. You can now visit your github repo at https://github.com/thinkshout/[new-project-name]. That repository will have information on the Pantheon multidev and Circleci configuration in its README.md
