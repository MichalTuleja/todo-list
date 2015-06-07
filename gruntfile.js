module.exports = function(grunt) {

grunt.initConfig({
 
    'http-server': {
         'dev': {
 
            // the server root directory 
            root: "build",
 
            // the server port 
            // can also be written as a function, e.g. 
            // port: function() { return 8282; } 
            port: 8282,
 
            // the host ip address 
            // If specified to, for example, "127.0.0.1" the server will  
            // only be available on that ip. 
            // Specify "0.0.0.0" to be available everywhere 
            host: "localhost",
 
            cache: "",
            showDir : true,
            autoIndex: true,
 
            // server default file extension 
            ext: "html",
 
            // run in parallel with other tasks 
            runInBackground: false,
 
        }
 
    },
	
	copy: {
	  main: {
		files: [
		  // includes files within path 
		  {expand: true, cwd: 'src/main/', src: ['index.html', 'docs/*.html', '**/*.css', '**/*.png', '**/*.PNG', '**/*.ico'], dest: 'build/main'},
          {expand: true, cwd: 'src/common', src: ['**/*.css', '**/glyphicons*.*'], dest: 'build/main'},
		  // includes files within path and its sub-directories 
		  //{expand: true, src: ['path/**'], dest: 'dest/'},
	 
		  // makes all src relative to cwd 
		  ///{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
	 
		  // flattens results to a single level 
		  ///{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
		],
	  },
	},
	
    clean: ["build"],	
     
	browserify: {
	  dist: {
		files: {
		  'build/main/app.js': ['src/main/app.js'],
		},
		options: {
		}
	  }
	},
    
    htmlbuild: {
        dist: {
            src: 'src/main/index.html',
            dest: 'build/main/',
            options: {
                beautify: true,
                //prefix: '//some-cdn',
                relative: true,
                scripts: {
                    bundle: [
                    ],
                    main: [],
                },
                styles: {
                    bundle: [

                    ],
                    test: []
                },
                sections: {
                    modals: 'src/main/templates/modals/*.html',
                    layout: {
                        header: 'src/main/templates/base/header.html',
                        footer: 'src/main/templates/base/footer.html',
                        add_item: 'src/main/templates/base/add_item.html',
                        search: 'src/main/templates/base/search.html',
                        task_list: 'src/main/templates/base/task_list.html',
                        navbar: 'src/main/templates/base/navbar.html'
                    }
                },
                data: {
                    // Data to pass to templates 
                    version: "0.1.0",
                    title: "test",
                },
            }
        }
    },
    
    watch: {
        scripts: {
            files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css', './gruntfile.js'],
            tasks: ['build'],
            options: {
                spawn: false,
            },
        },
    },
});

grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-html-build');
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-http-server');

grunt.registerTask('build', ['clean', 'copy', 'htmlbuild', 'browserify']);

grunt.registerTask('default', ['build', 'http-server']);

};
