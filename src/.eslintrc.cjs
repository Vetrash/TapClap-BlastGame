module.exports = {

  'env': {
        'browser': true,
        'es2021': true
    },    
    'extends': ['airbnb-base', 'eslint:recommended'],

    'rules':{ 
        
        'linebreak-style': 0,
        'global-require': 0,
        "eslint linebreak-style": [0, "error", "windows"],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
              "js": "always",
              "jsx": "never",
              "ts": "never",
              "tsx": "never"
            }
        ],
        'no-console': 'off',
              
    }
};
